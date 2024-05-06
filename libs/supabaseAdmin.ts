/**
 * Ce fichier contient des fonctions pour interagir avec Supabase et Stripe.
 * - `supabaseAdmin` est le client Supabase utilisé pour gérer les enregistrements.
 * - `upsertProductRecord` insère ou met à jour les enregistrements de produits dans Supabase.
 * - `upsertPriceRecord` insère ou met à jour les enregistrements de prix dans Supabase.
 * - `createOrRetrieveCustomer` crée ou récupère un client Stripe et l'enregistre dans Supabase.
 * - `copyBillingDetailsToCustomer` met à jour les informations de facturation du client dans Stripe et Supabase.
 * - `manageSubscriptionStatusChange` gère les modifications d'état des abonnements dans Supabase.
 */



import Stripe from "stripe";// Importation du package Stripe
import {createClient} from "@supabase/supabase-js";// Importation du client Supabase
import {Database} from "@/types_db";// Types pour les tables Supabase
import {Price,Product} from "@/types";// Types pour les produits et les prix
import {stripe} from "./stripe";// Client Stripe
import {toDateTime} from "./helpers"; // Fonction pour convertir le temps en format Date



// Crée un client Supabase administratif
export const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',// URL du Supabase
    process.env.SUPABASE_SERVICE_ROLE_KEY || '', // Clé de service Supabase
);

// Insère ou met à jour un enregistrement de produit
const upsertProductRecord = async (product : Stripe.Product) =>{
    // Structure les données du produit
    const productData : Product = {
        id: product.id,
        active : product.active,
        name : product.name,
        description : product.description ?? undefined,
        image : product.images?.[0] ?? null,
        metadata: product.metadata
    };

    // Effectue l'insertion/mise à jour dans la table `products`
    const {error} = await supabaseAdmin
        .from('products')
        .upsert([productData]);

    if (error) {
        throw error;// Lance une erreur en cas d'échec
    }
    console.log(`Product inserted/updated :${product.id}`);
}

// Insère ou met à jour un enregistrement de prix
const upsertPriceRecord = async (price: Stripe.Price) => {
    // Structure les données du prix
    const priceData : Price = {
        id: price.id,
        product_id: typeof price.product === 'string' ? price.product : '',
        active : price.active,
        currency : price.currency,
        description : price.nickname ?? undefined,
        type : price.type,
        unit_amount: price.unit_amount ?? undefined,
        interval : price.recurring?.interval,
        interval_count: price.recurring?.interval_count,
        trial_period_days: price.recurring?.trial_period_days,
        metadata:price.metadata
    };
    // Effectue l'insertion/mise à jour dans la table `prices`
    const {error} = await supabaseAdmin
        .from('prices')
        .upsert([priceData]);

    if (error) {
        throw error; // Lance une erreur en cas d'échec
    }
    console.log(`Price inserted/updated :${price.id}`);
}

// Crée ou récupère un client Stripe et l'enregistre dans Supabase
const createOrRetrieveCustomer = async ({
    email,
    uuid
} : {
    email: string,
    uuid: string
}) => {
    // Vérifie si le client existe déjà dans Supabase
    const {data, error} = await supabaseAdmin
        .from('customers')
        .select('stripe_customer_id')
        .eq('id', uuid)
        .single();

    // Si le client n'existe pas ou s'il n'a pas d'ID Stripe, crée un nouveau client Stripe
    if (error || ! data?.stripe_customer_id) {
        const customerData : {metadata : {supabaseUUID: string}; email?:string} = {
            metadata : {
                supabaseUUID : uuid
            }
        };
        if (email) customerData.email = email;

        // Crée le client Stripe
        const customer = await stripe.customers.create(customerData);
        // Enregistre le client dans Supabase
        const {error : supabaseError} = await supabaseAdmin
            .from('customers')
            .insert([{ id:uuid, stripe_customer_id: customer.id }]);

        if(supabaseError) {
            throw supabaseError;// Lance une erreur en cas d'échec
        }

        console.log(`New customer created and inserted for ${uuid}`);
        return customer.id;
    }

    // Retourne l'ID Stripe du client
    return data.stripe_customer_id;
};

// Copie les détails de facturation vers le client Stripe et Supabase
const copyBillingDetailsToCustomer = async (
    uuid: string,
    payment_method: Stripe.PaymentMethod
) => {
    const customer = payment_method.customer as string;
    const {name, phone, address} = payment_method.billing_details;
    if (!name || !phone || !address) return;
    //@ts-ignore
    // Met à jour les détails de facturation dans Stripe
    await stripe.customers.update(customer,{name, phone, address});

    // Met à jour les détails de facturation dans Supabase
    const {error} = await supabaseAdmin
        .from('users')
        .update({
            billing_address: {...address},
            payment_method:{...payment_method[payment_method.type]}
        })
        .eq('id',uuid);

    if (error) throw error; // Lance une erreur en cas d'échec
};

// Gère les changements d'état des abonnements
const manageSubscriptionStatusChange = async (
    subscriptionId: string,
    customerId: string,
    createAction = false
) => {
    // Récupère les données du client dans Supabase
    const {data: customerData, error: noCustomerError} = await supabaseAdmin
        .from('customers')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();
    if(noCustomerError) throw noCustomerError;

    const {id:uuid}=customerData!;

    // Récupère les détails de l'abonnement dans Stripe
    const subscription = await stripe.subscriptions.retrieve(
        subscriptionId,
        {
        expand:["default_payment_method"]
                }
    );

    // Structure les données de l'abonnement
    const subscriptionData : Database["public"]["Tables"]["subscriptions"]["Insert"]={
        id:subscription.id,
        user_id: uuid,
        metadata:subscription.metadata,
        // @ts-ignore
        status:subscription.status,
        price_id:subscription.items.data[0].price.id,
        // @ts-ignore
        quantity:subscription.quantity,
        cancel_at_period_end: subscription.cancel_at_period_end,
        cancel_at: subscription.cancel_at ? toDateTime(subscription.cancel_at).toISOString() : null,
        canceled_at: subscription.canceled_at ? toDateTime(subscription.canceled_at).toISOString(): null,
        current_period_start: toDateTime(subscription.current_period_start).toISOString(),
        current_period_end: toDateTime(subscription.current_period_end).toISOString(),
        created : toDateTime(subscription.created).toISOString(),
        ended_at: subscription.ended_at ? toDateTime(subscription.ended_at).toISOString(): null,
        trial_start: subscription.trial_start ? toDateTime(subscription.trial_start).toISOString(): null,
        trial_end: subscription.trial_end ? toDateTime(subscription.trial_end).toISOString(): null,
    };

    // Insère ou met à jour l'abonnement dans Supabase
    const {error} = await supabaseAdmin
        .from('subscriptions')
        .upsert([subscriptionData]);

    if (error) throw error;// Lance une erreur en cas d'échec

    console.log(`Inserted/Updated subscriptions: ${subscription.id} for ${uuid}`);

    // Copie les détails de facturation si nécessaire
    if(createAction && subscription.default_payment_method && uuid) {
        await copyBillingDetailsToCustomer(
            uuid,
            subscription.default_payment_method as Stripe.PaymentMethod
        )
    }
};

// Exporte les fonctions pour les utiliser ailleurs
export {
    upsertPriceRecord,
    upsertProductRecord,
    createOrRetrieveCustomer,
    manageSubscriptionStatusChange
};

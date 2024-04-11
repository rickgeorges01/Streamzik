// Importe le module Stripe pour interagir avec l'API de Stripe, permettant de gérer les paiements, les abonnements, etc.
import Stripe  from "stripe";

// Interface pour les détails d'un utilisateur.
export interface UserDetails {
    id: string;
    first_name : string;
    last_name : string;
    full_name?: string;
    avatar_url?: string;
    bill_address?: Stripe.Address
    payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type]
}

// Interface pour les détails d'un produit.
export interface Product {
    id: string;
    active?:boolean;
    name?: string;
    description?: string;
    image?:string;
    metadata?: Stripe.Metadata;

}
// Interface pour les détails de prix d'un produit.
export interface Price{
    id : string;
    product_id : string;
    active?: boolean;
    description?: string
    unit_amount?: number
    currency?: string;
    type?: Stripe.Price.Type;
    interval?: Stripe.Price.Recurring.Interval;
    interval_count?: number;
    trial_period_days?: number|null;
    metadata?:Stripe.Metadata;
    products?:Product;
}

// Interface pour les détails d'un abonnement.
export interface Subscription {
    id: string;
    user_id : string;
    status?: Stripe.Subscription.Status;
    metadata?: Stripe.Metadata;
    price_id?: string;
    quantity?: string;
    cancel_at_period_end?:boolean;
    created : string;
    current_period_start:string;
    current_period_end:string;
    ended_at?: string;
    cancel_at?: string;
    canceled_at?: string;
    trial_start?: string;
    trial_end?: string;
    prices?: Price;

}

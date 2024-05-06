/**
 * `PlayerContent` est un composant qui fournit les contrôles du lecteur pour la chanson actuellement sélectionnée.
 * - `useSound` gère la lecture audio et ses événements, tels que le démarrage, la pause et la fin.
 * - Les boutons de contrôle permettent de passer à la chanson suivante ou précédente.
 * - Le volume peut être ajusté ou mis en sourdine.
 * Ce composant est utilisé pour offrir une interface de lecture interactive aux utilisateurs.
 */

"use client"

// Importation des composants et hooks nécessaires
import { Song } from "@/types"; // Type représentant une chanson
import MediaItem from "@/components/MediaItem"; // Composant pour afficher les détails d'une chanson
import LikeButton from "@/components/LikeButton"; // Composant pour ajouter/retirer une chanson des favoris
import { BsPauseFill, BsPlayFill } from "react-icons/bs"; // Icônes pour les boutons de lecture
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai"; // Icônes pour les boutons précédent/suivant
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2"; // Icônes pour les boutons de volume
import Slider from "@/components/Slider"; // Composant pour ajuster le volume
import usePlayer from "@/hooks/usePlayer"; // Hook pour accéder aux informations du lecteur
import { useEffect, useState } from "react";
import useSound from "use-sound"; // Hook pour gérer la lecture audio

// Interface définissant les propriétés du composant `PlayerContent`
interface PlayerContentProps {
    song: Song; // Détails de la chanson actuellement sélectionnée
    songUrl: string; // URL de la chanson
}

// Définition du composant `PlayerContent`
const PlayerContent: React.FC<PlayerContentProps> = ({
                                                         song,
                                                         songUrl
                                                     }) => {
    const player = usePlayer(); // Pour accéder aux informations du lecteur
    const [volume, setVolume] = useState(1); // État pour gérer le volume
    const [isPlaying, setIsPlaying] = useState(false); // État pour savoir si la chanson est en cours de lecture

    // Choisir l'icône de lecture/pause en fonction de l'état `isPlaying`
    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    // Choisir l'icône de volume en fonction du niveau `volume`
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    // Fonction pour passer à la chanson suivante
    const onPlayNext = () => {
        if (player.ids.length === 0) return; // Retourne si aucune chanson n'est disponible

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        // Si aucune chanson suivante n'est disponible, revient au début de la liste
        if (!nextSong) return player.setId(player.ids[0]);

        player.setId(nextSong); // Passe à la chanson suivante
    }

    // Fonction pour revenir à la chanson précédente
    const onPlayPrevious = () => {
        if (player.ids.length === 0) return; // Retourne si aucune chanson n'est disponible

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        // Si aucune chanson précédente n'est disponible, va à la dernière chanson
        if (!previousSong) return player.setId(player.ids[player.ids.length - 1]);

        player.setId(previousSong); // Reviens à la chanson précédente
    }

    // Hook `useSound` pour gérer la lecture audio
    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true), // Démarre la lecture
            onend: () => {
                setIsPlaying(false); // Arrête la lecture
                onPlayNext(); // Passe à la chanson suivante
            },
            onpause: () => setIsPlaying(false), // Met en pause la lecture
            format: ['mp3']
        }
    );

    // Utilisation de `useEffect` pour gérer le démarrage du son
    useEffect(() => {
        sound?.play(); // Démarre la lecture du son

        // Nettoyage pour décharger le son
        return () => {
            sound?.unload();
        }
    }, [sound]);

    // Fonction pour gérer le clic sur le bouton de lecture
    const handlePlay = () => {
        if (!isPlaying) {
            console.log('Playing song');
            play(); // Démarre la lecture
        } else {
            console.log('Pausing song');
            pause(); // Met en pause la lecture
        }
    };

    // Fonction pour gérer le clic sur le bouton de volume
    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1); // Remet le volume
        } else {
            setVolume(0); // Met en sourdine
        }
    };

    // Rendu du composant `PlayerContent`
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            {/* Colonne pour afficher les détails de la chanson et le bouton de like */}
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song}/>
                    <LikeButton songId={song.id}/>
                </div>
            </div>

            {/* Colonne pour afficher le bouton de lecture (mobile) */}
            <div className="flex md:hidden col-auto w-full justify-end items-center">
                <div
                    onClick={handlePlay}
                    className="
                        h-10
                        w-10
                        flex
                        items-center
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black"/>
                </div>
            </div>

            {/* Colonne pour afficher les contrôles du lecteur (bureau) */}
            <div className="
                    hidden h-full md:flex justify-center items-center
                    w-full max-w-[722px] gap-x-6
                "
            >
                <AiFillStepBackward
                    onClick={onPlayPrevious}
                    size={30}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />
                <div
                    onClick={handlePlay}
                    className="
                        flex
                        items-center
                        justify-center
                        h-10
                        w-10
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black"/>
                </div>
                <AiFillStepForward
                    onClick={onPlayNext}
                    size={30}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />
            </div>

            {/* Colonne pour afficher le contrôle du volume */}
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        className="cursor-pointer"
                        size={34}
                    />
                    <Slider
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>
        </div>
    );
}

// Exportation du composant pour utilisation ailleurs dans l'application
export default PlayerContent;

'use client';

import { InlineSpinner } from '@/components/loadingSpinner/LoadingSpinner';
import StatutsCard from '@/components/statutsCard/StatutsCard';
import { useSidebar } from '@/components/ui/sidebar';
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { Check, Copy, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const VideoCall = () => {
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participants = useParticipants();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const { setOpen } = useSidebar();

  const handleLeave = () => {
    setOpen(true);
    router.push('/dashboard');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.log("Error copying to clipboard:", error);
    }
  };

  // États de chargement/connexion
  if (callingState === CallingState.JOINING) {
    return (
      <StatutsCard
        className='bg-gray-50 rounded-lg'
        title='Joining Call...'
        description='Please wait while we connect you to the call'>
        <InlineSpinner size='lg' />
      </StatutsCard>
    );
  }

  if (callingState === CallingState.RECONNECTING) {
    return (
      <StatutsCard
        className='bg-gray-50 rounded-lg border-yellow-200'
        title='Reconnecting Call...'
        description='Connection lost, attempting to reconnect.'>
        <div className="animate-pulse rounded-full h-12 w-12 bg-yellow-200 mx-auto"></div>
      </StatutsCard>
    );
  }

  // CORRECTION: Changement de la condition ici
  // On affiche l'interface vidéo seulement quand on est JOINED
  if (callingState !== CallingState.JOINED) {
    return (
      <StatutsCard
        className='bg-gray-50 rounded-lg'
        title='Loading Call...'
        description={`Status: ${callingState}`}>
        <div className="animate-pulse rounded-full h-12 w-12 bg-gray-400 mx-auto"></div>
      </StatutsCard>
    );
  }

  // Interface principale de l'appel vidéo
  return (
    <div className='h-screen flex flex-col'>
      <div className="flex-1 relative">
        <SpeakerLayout />
      </div>
      
      {/* Contrôles d'appel */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <CallControls onLeave={handleLeave} />
      </div>

      {/* Indicateur du nombre de participants */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-black/50 text-white px-3 py-2 rounded-lg flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="text-sm">{participants.length} participant{participants.length > 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Modal d'invitation quand on est seul */}
      {participants.length === 1 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-20">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Waiting for others to join
                </h2>
                <p className="text-gray-600">
                  Share this link with others to invite them to join the call
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="flex-1 text-sm text-gray-700 font-mono break-all">
                    {typeof window !== 'undefined' ? window.location.href : 'Loading...'}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" /> 
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> 
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 space-y-1">
                <p>Others will be able to join the call using this link</p>
                <p>You can continue using the call while waiting for others</p>
              </div>

              {/* Bouton pour fermer le modal */}
              <button
                onClick={() => {
                  // On peut ajouter un état pour contrôler l'affichage du modal
                  // Pour l'instant, on peut juste laisser l'utilisateur cliquer ailleurs
                }}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Continue with call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
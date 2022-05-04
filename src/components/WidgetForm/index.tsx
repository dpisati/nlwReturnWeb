import { useState } from 'react';
import { CloseButton } from '../CloseButton';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import otherImageUrl from '../../assets/thought.svg';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
    BUG: {
        title: 'Problem',
        image: {
            source: bugImageUrl,
            alt: 'Cute Bug illustration',
        },
    },
    IDEA: {
        title: 'Idea',
        image: {
            source: ideaImageUrl,
            alt: 'Light Bulb illustration',
        },
    },
    OTHER: {
        title: 'Other',
        image: {
            source: otherImageUrl,
            alt: 'Though illustration',
        },
    },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function Widgetform() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback() {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feedbackSent ? (
                <FeedbackSuccessStep
                    onFeedbackRestartRequest={handleRestartFeedback}
                />
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep
                            onFeedbackTypeChanged={setFeedbackType}
                        />
                    ) : (
                        <FeedbackContentStep
                            onFeedbackRestarted={handleRestartFeedback}
                            feedbackType={feedbackType}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                </>
            )}

            <footer className="text-xs text-neutral-400">
                Made with love 💖 by{' '}
                <a
                    href="https://dpportfolio.vercel.app/"
                    target="_blank"
                    className="underline underline-offset-2"
                >
                    Daniel Pisati
                </a>
            </footer>
        </div>
    );
}

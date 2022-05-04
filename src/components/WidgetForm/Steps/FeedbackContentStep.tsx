import { ArrowLeft, Camera } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { FeedbackType, feedbackTypes } from '..';
import { CloseButton } from '../../CloseButton';
import { ScreenshotButton } from '../ScreenshotButton';

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestarted: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({
    feedbackType,
    onFeedbackRestarted,
    onFeedbackSent,
}: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();

        console.log({
            screenshot,
            comment,
        });

        onFeedbackSent();
    }

    return (
        <>
            <header>
                <button
                    type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={onFeedbackRestarted}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img
                        className="w-6 h-6 mr-2"
                        src={feedbackTypeInfo.image.source}
                        alt={feedbackTypeInfo.image.alt}
                    />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>

            <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-400 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Tell us what is happening"
                />

                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTaken={setScreenshot}
                    />
                    <button
                        disabled={comment.length === 0}
                        type="submit"
                        className="p-2 bgbrand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm bg-brand-500 hover:bg-brand-300 focus:outline-none transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-500"
                    >
                        Send Feedback
                    </button>
                </footer>
            </form>
        </>
    );
}
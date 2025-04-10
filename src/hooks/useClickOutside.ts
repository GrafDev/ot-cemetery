import { useEffect, RefObject } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

function useClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: Handler
): void {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref.current;
            if (!el || el.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}

export default useClickOutside;

import { useEffect, MutableRefObject } from "react";

const useWillChange = (
  ref: MutableRefObject<HTMLElement | null>,
  property: string,
  trigger: boolean
): void => {
  useEffect(() => {
    const currentRef = ref.current;

    const handleTransitionEnd = (): void => {
      if (currentRef) {
        currentRef.style.willChange = "auto";
      }
    };

    if (currentRef && trigger) {
      currentRef.style.willChange = property;
    }

    if (currentRef) {
      currentRef.addEventListener("transitionend", handleTransitionEnd);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
  }, [trigger, property]);
};

export default useWillChange;

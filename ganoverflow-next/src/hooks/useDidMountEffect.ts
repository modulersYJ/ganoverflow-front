import { DependencyList, useEffect, useRef } from "react";

// 첫 마운트 시 부수효과를 막는 커스텀 훅
const useDidMountEffect = (
  func: () => void,
  deps: DependencyList | undefined
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useDidMountEffect;

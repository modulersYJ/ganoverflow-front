  const checkUserSigned = useSignedCheck();

  return () => {
    if (!checkUserSigned()) return;

const resetAction = (action, setMixedAudioSources, setLastAddingAction) => {
  const { index } = action;

  setMixedAudioSources((prev) => {
    const result = prev.slice();
    result.splice(index, 1);

    return result;
  });

  setLastAddingAction({});
};

export default resetAction;

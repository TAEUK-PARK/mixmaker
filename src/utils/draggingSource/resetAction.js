const resetAction = (action, setMixedAudioSources, setLastAddingAction) => {
  const { index } = action;

  console.log("reset", index);

  setMixedAudioSources((prev) => {
    const result = prev.slice();
    result.splice(index, 1);

    return result;
  });

  setLastAddingAction({});
};

export default resetAction;

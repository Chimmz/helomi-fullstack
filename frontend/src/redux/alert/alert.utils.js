export const addAndRemoveAlert = (add, remove, timeout = 5000) => {
   setTimeout(remove, timeout);
   add();
};

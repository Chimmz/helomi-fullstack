export const addAndRemoveAlert = (add, remove, timeout = 4500) => {
   setTimeout(remove, timeout);
   add();
};

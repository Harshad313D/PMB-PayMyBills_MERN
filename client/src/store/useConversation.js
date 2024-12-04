// import { create } from 'zustand';  

// const useConversation = create((set) => ({
//   selectedConversation: null,  // Default value for selectedConversation
//   setSelectedConversation: (selectedConversation) =>
//     set({ selectedConversation }), 
//   messages: [],
//   setMessage: (messages) => set({ messages }),
// }));
// export default useConversation;


import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (user) => set({ selectedConversation: user }),

  messages: [],
  setMessage: (messages) => set({ messages }),
}));
export default useConversation;
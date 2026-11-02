import { createContext, useContext } from 'react';

/** LP内のどのCTAからでもチャットフォームを開けるようにする */
export const FormContext = createContext<(source: string) => void>(() => {});
export const useOpenForm = () => useContext(FormContext);

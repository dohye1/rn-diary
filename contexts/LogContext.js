import React, {createContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const LogContext = createContext();

export function LogContextProvier({children}) {
  const [logs, setLogs] = useState(
    Array.from({length: 10}).map((_, index) => ({
      id: uuidv4(),
      title: `Log ${index}`,
      body: `Body ${index}`,
      date: new Date().toISOString(),
    })),
  );

  const onCreate = ({title, body, date}) => {
    const log = {id: uuidv4(), title, body, date};
    setLogs([log, ...logs]);
  };

  return (
    <LogContext.Provider value={{logs, onCreate}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;

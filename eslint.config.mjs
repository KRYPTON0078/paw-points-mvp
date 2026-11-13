import next from 'eslint-config-next/core-web-vitals';
export default [...next,{ignores:['.next/**']},{rules:{'@next/next/no-img-element':'off','react-hooks/set-state-in-effect':'off'}}];

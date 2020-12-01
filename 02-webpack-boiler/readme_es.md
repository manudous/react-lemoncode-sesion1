# 02 Web Boiler plate

## Resumen

En este ejempo hay montado un boiler plate en webpack con soporte a Typescript, justo en el paso previo
a añadirle soporte a React.

Está basado en los ejemplos de Webpack.

Este ejemplo es el único que no tiene un paso a paso (si necesitas guía puedes ir a los ejemplos
de webpack que econtrarás en este repositorio).

A destacar:

- El webpackconfig tiene configurada la carpeta src, y los loaders para manejar typescript.
- Tenemos ficheros de configuracion de babel y typescript.
- Hacemos la transpilación utlizando babel.

En el siguiente ejemplo tomaremos este como punto de partida y si iremos paso a paso añadiendo
soporte a React.

>#### Configuramos Webpack con React

+ Instalamos React y ReactDom

```$ npm install react react-dom --save```
+ Instalamos los typing de react y react-dom
```$ npm install @types/react @types/react-dom --save-dev```
+ Creamos un div en el HTML. Así sabe Reacto como instanciar su aplicación
```<div id="root"></div>```
+ Me creo un App.tsx
```
import React from 'react';

export const App = () => {
  return <h1>Hello React</h1>
}
```
+ Vamos al index.tsx
React Dom es el que mete React en tu Aplicación.
```
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById("root")
);
```
Esto no funcionaría pq babel está esperando js no jsx.
+ Intalos el preset react para babel
```$ npm install @babel/preset-react --save-dev```
Nos vamos a .babelrc y añadimos el presect react
```
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript","@babel/preset-react"]
}
```
Ahora habría que irse a webpack.config.js y mirar si tengo bien referenciado los archivos jsx.
+ Ahora probamos con unos datos mocks
```
import React from "react";

const membersMock = [
  {
    id: 14540103,
    login: "antonio06",
    avatar_url: "https://avatars1.githubusercontent.com/u/14540103?v=4",
  },
  {
    id: 1457912,
    login: "brauliodiez",
    avatar_url: "https://avatars1.githubusercontent.com/u/1457912?v=4",
  },
];

export const App = () => {
  const [members, setMembers] = React.useState(membersMock);

  return <h1>{ members[0].login}</h1>;
};
```
Me traigo los datos del mock al app con el useState, y pinto el Login del primer objeto de mi mock.

+ Ahora vamos a pintar por pantallas los dos login del mock

import React from "react";

const membersMock = [
  {
    id: 14540103,
    login: "antonio06",
    avatar_url: "https://avatars1.githubusercontent.com/u/14540103?v=4",
  },
  {
    id: 1457912,
    login: "brauliodiez",
    avatar_url: "https://avatars1.githubusercontent.com/u/1457912?v=4",
  },
];

export const App = () => {
  const [members, setMembers] = React.useState(membersMock);

  return (
    <>
      {
        members.map((member) =>
          <h1>{ member.login }</h1>
        )
      }
    </>
  );
};

+ Ahora vamos a meterlo con una tabla HTML

```
import React from "react";

const membersMock = [
  {
    id: 14540103,
    login: "antonio06",
    avatar_url: "https://avatars1.githubusercontent.com/u/14540103?v=4",
  },
  {
    id: 1457912,
    login: "brauliodiez",
    avatar_url: "https://avatars1.githubusercontent.com/u/1457912?v=4",
  },
];

export const App = () => {
  const [members, setMembers] = React.useState(membersMock);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr>
              <td><img src={member.avatar_url} style={{ width: "5rem" }} /></td>
              <td>{ member.id}</td>
              <td>{member.login}</td>
            </tr>          
          ))}
        </tbody>
      </table>
    </>
  );
};

```

+ Pero como ya vemos que nos funciona ahora vamos a hacer lo mismo con datos reales. Ponemos el React.useState([]), con un array vacío que es donde vamos a ir piendo luego nuestros componentes del Array que iremos formando con el map.Metemos React.useEffect para que empiece el ciclo de vida y los corchetes dicen que se ejecute justo solo cuando se monte el componente en el DOM. Dentro ejecutamos un fech.

```
import React from "react";


export const App = () => {
  const [members, setMembers] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/lemoncode/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr>
              <td><img src={member.avatar_url} style={{ width: "5rem" }} /></td>
              <td>{ member.id}</td>
              <td>{member.login}</td>
            </tr>          
          ))}
        </tbody>
      </table>
    </>
  );
};
```

+ Lo vamos a refactorizar, vamos a tiparlo. Creamos una carpeta model.ts
```
export interface MemberEntity {
  avatar_url: string;
  id: string;
  login: string;
}
```

Importamos este modedo
```import { MemberEntity } from './model';```
Tipamos con el genérico el React.useState
```const [members, setMembers] = React.useState<MemberEntity[]>([]);```
+ Ahora vamos a encapsular la tabla. Creamos un archivo member-table-row.tsx
```
import React from 'react';
import { MemberEntity } from './model';

interface Props {
  member: MemberEntity;
}

export const MemberTableRow: React.FC<Props> = (props) => {
  const { member } = props;

  return (
    <tr>
      <td><img src={member.avatar_url} style={{ width: "5rem" }} /></td>
      <td>{ member.id}</td>
      <td>{member.login}</td>
    </tr>   
  );
};
```
Ahora en app.tsx tenemos que importar el archivo MemberTableRow y donde teniamos el tr antes tenemos que poner el Componente, llamar al member del interface Props y también crear una key para que React asocie a cada componente un id único, comprueba que esa es su id, a lo mejor no tiene que repintarlo o eliminarlo.

```
import React from "react";
import { MemberTableRow } from "./member-table-row";
import { MemberEntity } from './model';

export const App = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/lemoncode/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <MemberTableRow key={ member.id} member={ member}/>       
          ))}
        </tbody>
      </table>
    </>
  );
};
```

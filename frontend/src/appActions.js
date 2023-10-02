import {createAction} from '@reduxjs/toolkit';

// Definiciones de acciones
export const setPlayerName = createAction('player/setName');
export const setPlayerId = createAction('player/setId');
export const setPlayerLogedIn = createAction('player/setLogedIn');
export const setHand = createAction('hand/setHand');
export const appendToHand = createAction('hand/appendToHand');
export const setPlayerInGame = createAction('game/setPlayers');
export const setPositionInGame = createAction('game/setPosition');
export const setRolInGame = createAction('game/setRol');

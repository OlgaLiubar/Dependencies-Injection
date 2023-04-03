import { createIoCContainer } from './ioc';
import type { User } from './types';

export const ioc = createIoCContainer()

const renderUsers = async () => {
  const usersService = ioc.resolve('user');
  const users = await usersService.getUsers();

  const listNode = document.getElementById('users-list');

  users.forEach((user: User) => {
    const listItemNode = document.createElement('li');

    listItemNode.innerHTML = user.name;
    listNode.appendChild(listItemNode);
  });
};

const app = () => {
  delete (window as any).__CONFIG__;

  renderUsers();
};

window.onload = (event: Event) => {
  const config = (window as any).__CONFIG__;
  const logger = ioc.resolve('logger');
  ioc.register('apiConfig', config.api)

  logger.info('Page is loaded.');

  app();
};

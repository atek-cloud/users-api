import { rpc, createRpcServer } from '@atek-cloud/node-rpc'

export const ID = 'atek.cloud/users-api'

export interface UsersApi {
  // List current users
  list (): Promise<{users: User[]}>

  // Get a user
  get (userKey: string): Promise<User>

  // Create a user
  create (user: NewUser): Promise<User>

  // Update a user
  update (userKey: string, user: UserUpdate): Promise<User>

  // Delete a user
  delete (userKey: string): Promise<void>

  // Get a user's settings
  getSettings (userKey: string): Promise<UserSettings>
  
  // Get a user's settings
  updateSettings (userKey: string, settings: UserSettingsUpdate): Promise<UserSettings>
}

export class User {
  key: string = ''
  username: string = '';
  role: string = '';
  static schema = {
    type: 'object',
    properties: {
      key: {type: 'string'},
      username: {type: 'string', minLength: 3},
      role: {type: 'string'}
    },
    required: ['key', 'username']
  }
}

export class NewUser {
  username: string = '';
  password: string = '';
  role: string = '';
  static schema = {
    type: 'object',
    properties: {
      username: {type: 'string', minLength: 3},
      password: {type: 'string'},
      role: {type: 'string'}
    },
    required: ['username', 'password']
  }
}

export class UserUpdate {
  username: string = '';
  password: string = '';
  role: string = '';
  static schema = {
    type: 'object',
    properties: {
      username: {type: 'string', minLength: 3},
      password: {type: 'string'},
      role: {type: 'string'}
    }
  }
}

export class UserSettings {
  mainServiceId: string = ''
  static schema = {
    type: 'object',
    properties: {
      mainServiceId: {type: 'string'}
    }
  }
}

export class UserSettingsUpdate {
  mainServiceId: string = ''
  static schema = {
    type: 'object',
    properties: {
      mainServiceId: {type: 'string'}
    }
  }
}

export function createClient () {
  return rpc<UsersApi>(ID)
}

export function createServer (handlers: any) {
  return createRpcServer(handlers, {
    list: {
      response: {type: 'object', properties: {users: {type: 'array', items: User.schema}}, required: ['users']}
    },
    get: {
      response: User
    },
    create: {
      params: [NewUser],
      response: User
    },
    update: {
      params: [{type: 'string'}, UserUpdate],
      response: User
    },
    delete: {
      params: [{type: 'string'}]
    },
    getSettings: {
      params: [{type: 'string'}],
      response: UserSettings
    },
    updateSettings: {
      params: [{type: 'string'}, UserSettingsUpdate],
      response: UserSettings
    }
  })
}

export default createClient()
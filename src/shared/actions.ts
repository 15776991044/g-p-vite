function emptyAction() {
  console.warn('current execute action is empty!')
  return false
}

class Actions {
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction,
    getRouteInfo: emptyAction,
    getUserInfo: emptyAction,
  }

  setActions(actions:Actions) {
    this.actions = actions
  }

  onGlobalStateChange(...args:[]) {
    return this.actions.onGlobalStateChange(...args)
  }

  setGlobalState(...args:[]) {
    return this.actions.setGlobalState(...args)
  }

  getRouteInfo(...args:[]) {
    return this.actions.getRouteInfo ? this.actions.getRouteInfo(...args) : emptyAction()
  }

  getUserInfo() {
    return this.actions.getUserInfo ? this.actions.getUserInfo() : emptyAction()
  }
}

const actions:Actions = new Actions()

export default actions

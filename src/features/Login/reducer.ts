export interface LoginState {
  loading: boolean;
  email: string;
  password: string;
}

export type LoginFormAction = "modify-email" | "modify-password";
export type LoginSubmissionAction = "start-login" | "login-success";
export type LoginAction = LoginFormAction & LoginSubmissionAction;

type ReducerAction =
  | {
      type: LoginFormAction;
      payload: string;
    }
  | {
      type: LoginSubmissionAction;
    };

function reducer(state: LoginState, action: ReducerAction) {
  switch (action.type) {
    case "modify-email":
      return {
        ...state,
        email: action.payload,
      };
    case "modify-password":
      return {
        ...state,
        password: action.payload,
      };
    case "start-login":
      return {
        ...state,
        loading: true,
      };
    case "login-success":
      return {
        ...state,
        loading: false,
      };
  }
}

export default reducer;

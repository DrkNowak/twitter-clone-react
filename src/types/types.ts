export type User = {
    id?: string,
    name?: string,
    email?: string,
    password?: string,
}
  
export type StringFunction = (value: string) => string;

export type ValidationRulesTypes = {
    email: StringFunction,
    password: StringFunction,
    name: StringFunction,
    id: StringFunction
}

export type Tweet = { author_id: string, id: string, text: string, name: string}
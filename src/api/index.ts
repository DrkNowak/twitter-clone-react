import axios from 'axios';

const baseUrl = 'http://localhost:3000/';

const endpoints = {
    tweets: 'tweets',
    users: 'users'
};

export async function getUser(user : string = ''){
   return axios.get(`${baseUrl}${endpoints.users}/${user}`);
}

export async function getTweets(){
    return axios.get(baseUrl+endpoints.tweets);
}

export async function register(data: object){
    return axios.post(`${baseUrl}${endpoints.users}`, data);
}

export async function postTweet(data: object){
    return axios.post(`${baseUrl}${endpoints.tweets}`, data);
}


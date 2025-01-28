import axios from 'axios';
import { AxiosInstance } from 'axios';

import { Tweet, User } from '../types/types';

const endpoints = {
  tweets: 'tweets',
  users: 'users',
};

const axiosClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
});

class ApiService {
  constructor(private client: AxiosInstance) {}

  async getUser(user: string = ''): Promise<User> {
    const response = await this.client.get(`${endpoints.users}/${user}`);

    return response.data;
  }

  async getTweets(): Promise<Tweet[]> {
    const response = await this.client.get(endpoints.tweets);

    return response.data;
  }

  async register(data: User): Promise<void> {
    await this.client.post(endpoints.users, data);
  }

  async postTweet(data: Tweet): Promise<void> {
    this.client.post(endpoints.tweets, data);
  }

  async updateRating(data: Tweet): Promise<void> {
    await this.client.patch(`${endpoints.tweets}/${data.id}`, data);
  }
}

export const apiService = new ApiService(axiosClient);

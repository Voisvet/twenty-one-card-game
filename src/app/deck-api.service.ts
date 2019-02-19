import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

export interface Card {
  image: string;
  value: string;
  suit: string;
  code: string;
}

interface ShuffleResponse {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

interface DrawResponse {
  success: boolean;
  cards: Card[];
  deck_id: string;
  remaining: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeckApiService {

  private deckId: string;
  private basicUrl = 'https://deckofcardsapi.com/api/deck';

  constructor(private http: HttpClient) {
    http.get<ShuffleResponse>(this.basicUrl + '/new/shuffle/').subscribe(
      response => this.deckId = response.deck_id
    );
  }

  drawCards(amount: number = 1) {
    const params = new HttpParams().set('count', amount.toString());

    return this.http
      .get<DrawResponse>(this.basicUrl + '/' + this.deckId + '/draw/', {params})
      .pipe(map(value => value.cards));
  }

  reshuffleDeck() {
    return this.http
      .get<ShuffleResponse>(this.basicUrl + '/' + this.deckId + '/shuffle/')
      .pipe(map(value => value.success));
  }
}

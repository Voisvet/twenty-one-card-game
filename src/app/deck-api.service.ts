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

  drawCard() {
    const params = new HttpParams();
    params.append('count', '1');

    return this.http
      .get<DrawResponse>(this.basicUrl + '/' + this.deckId + '/draw/', {params})
      .pipe(map(value => value.cards[0]));
  }

  reshuffleDeck() {
    return this.http
      .get<ShuffleResponse>(this.basicUrl + '/' + this.deckId + '/shuffle/')
      .pipe(map(value => value.success));
  }
}

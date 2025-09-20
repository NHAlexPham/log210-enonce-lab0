import { De } from "./de";
import { Joueur } from "./joueur";
import { NotFoundError } from "./errors/notFoundError";
import { AlreadyExistsError } from "./errors/alreadyExistsError";

export class JeuDeDes {
  // classe contrôleur GRASP, car JeuDeDes est un objet racine dans le MDD

  private _joueurs: Map<string, Joueur>;
  private _d1: De;
  private _d2: De;
  private _d3: De;

  constructor() {
    this._joueurs = new Map<string, Joueur>();
    this._d1 = new De();
    this._d2 = new De();
    this._d3 = new De();
  }

  public demarrerJeu(nom: string): string {
    if (this._joueurs.get(nom)) {
      throw new AlreadyExistsError(`Joueur '${nom}' existe déjà.`);
    }

    const joueur = new Joueur(nom);
    this._joueurs.set(nom, joueur);
    return JSON.stringify(joueur);
  }

  public jouer(nom: string): string {
    const joueur = this._joueurs.get(nom);
    if (!joueur) {
      throw new NotFoundError(`Joueur '${nom}' n'existe pas.`);
    }

    this._d1.brasser();
    this._d2.brasser();
    this._d3.brasser();

    const v1 = this._d1.valeur;
    const v2 = this._d2.valeur;
    const v3 = this._d3.valeur;
    const somme = v1 + v2 + v3;

    joueur.lancer();
    const gagne = somme <= 10;
    if (gagne) joueur.gagner();

    const resultat = {
      nom,
      v1,
      v2,
      v3: this._d3.valeur,
      somme,
      lancers: joueur.lancers,
      lancersGagnes: joueur.lancersGagnes,
      message: `Vous avez ${(gagne ? "gagné!!!" : "perdu.")}`
    };

    return JSON.stringify(resultat);
  }

  public redemarrerJeu() {
    this._joueurs.clear();
  }

  public terminerJeu(nom: string): string {
    if (!this._joueurs.get(nom)) {
      throw new NotFoundError(`Joueur '${nom}' n'existe pas.`);
    }

    this._joueurs.delete(nom);
    const resultat = {
      nom: nom,
      message: "Merci d'avoir joué."
    };

    return JSON.stringify(resultat);
  }

  public get joueurs() {
    return JSON.stringify(Array.from(this._joueurs.values()));
  }

  public brasser(): number {
  this._d1.brasser();
  this._d2.brasser();
  return this._d1.valeur + this._d2.valeur;
}

}

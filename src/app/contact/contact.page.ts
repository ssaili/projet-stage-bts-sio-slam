import { Component, OnInit } from '@angular/core';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../app.module';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  contactName: string;
  contactEmail: string;
  contactMessage: string;
  showMyMessage = false;

  constructor() { }

  ngOnInit() {
  }

  //Vérifier que tous les champs sont bien remplis
  isValid(){
    return this.contactName && this.contactEmail
    && this.contactMessage
  }

  //Ajouter les données du formulaire à la collection contactForm
  async send() {
    const docRef = await addDoc(collection(db, "contactForm"), {
      name: this.contactName,
      email: this.contactEmail,
      message: this.contactMessage
    });
    console.log("Document written with ID: ", docRef.id);

    setTimeout(() => {
      this.showMyMessage = true
    }, 2000)
  }
  }

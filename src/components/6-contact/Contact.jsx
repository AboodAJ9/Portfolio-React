import React from 'react';
import './contact.css';
import { useForm, ValidationError } from '@formspree/react';
import Lottie from "lottie-react";
import doneAnimation from "../../animations/done.json";
import mailAnimation from "../../animations/email.json";

const Contact = () => {

    const [state, handleSubmit] = useForm("mldbkpbl");

    return (
        <section className='contact-me'>

            <h1 className='title flex'>
                <span className=' icon-envelope'> </span>
                Kontakt
            </h1>
            <p className='sub-title'> Kontaktieren Sie mich gerne über dieses Formular oder direkt per E-Mail. Meine Adresse finden Sie in meinem Bewerbungsschreiben und Lebenslauf.</p>


            <div style={{ justifyContent: "space-between" }} className="flex">
                <form className='flex-grow' onSubmit={handleSubmit}>
                    <div className=' flex'>
                        <label htmlFor='email'>Email-Adresse:</label>
                        <input autoComplete='off' required type="email" name="email" id="email" />
                        <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                        />


                    </div>

                    <div className="flex" style={{ marginTop: "25px" }}>
                        <label htmlFor="message">Ihre Nachricht:</label>
                        <textarea required name="message" id="message"></textarea>
                        <ValidationError
                            prefix="Message"
                            field="message"
                            errors={state.errors}
                        />
                    </div>
                    <button className='submit' type="submit" disabled={state.submitting}>
                        Senden
                    </button>
                    {state.succeeded && (
                        <h1 className='flex' style={{ fontSize: "18px", margin: "0.5rem", textAlign: "center" }}>
                            <Lottie className='lottie' loop={false} style={{ height: 37, paddingRight: "10px" }} animationData={doneAnimation} />
                            Ihre Nachricht wurde erfolgreich gesendet.</h1>
                    )}
                </form>
                <div className="animation">

                    <Lottie className=' mail-animation' animationData={mailAnimation} />
                </div>

            </div>








        </section>
    );
}

export default Contact;

//  Ich werde sie so bald wie möglich prüfen und mich bei Ihnen melden 🚀
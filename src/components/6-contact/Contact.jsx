import { Suspense, lazy, useState } from 'react';
import './contact.css';
import { useForm, ValidationError } from '@formspree/react';
import doneAnimation from "../../animations/done.json";
import mailAnimation from "../../animations/email.json";
import { useTranslation } from 'react-i18next';
import SuccessMessage from './SucessMessage';

const Lottie = lazy(() => import("lottie-react"));

const Contact = () => {

    const { t } = useTranslation();
    const [state, handleSubmit] = useForm("mldbkpbl");
    const [values, setValues] = useState({ email: "", message: "" })
    const [errors, setErrors] = useState({ email: "", message: "" });

    const validate = () => {
        const newErrors = {};
        if (!values.email) {
            newErrors.email = t("emailRequired");
        }
        else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(values.email)) {
            newErrors.email = t("emailInvalid");
        }
        if (!values.message) {
            newErrors.message = t("msgRequired");
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (validate()) {
            handleSubmit(e);
        }
    }

    return (
        <section id="contact" className='contact-me'>

            <h1 className='title flex'>
                <span className=' icon-envelope'> </span>
                {t("contact")}
            </h1>
            <p className='sub-title'> {t("contact-desc")}</p>


            <div style={{ justifyContent: "space-between" }} className="flex">
                <form className='flex-grow' onSubmit={submitForm} noValidate>
                    <div className=' flex ' style={{ alignItems: "start" }}>
                        <label className='label' htmlFor='email'>{t("email")}</label>
                        <div className='input'>
                            <input
                                type='email'
                                name="email"
                                autoComplete='off'
                                id = {`email${errors.email ? '-error' : ''}`}
                                value={values.email}
                                onChange={(e) => setValues({ ...values, email: e.target.value })}
                            />
                            <div style={{ minHeight: "30px" }}>
                                {errors.email && (
                                    <p style={{ color: "red", paddingTop: "5px" }}> {errors.email}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex" style={{ alignItems: "start", paddingTop: "10px" }}>
                        <label className='label' htmlFor="message">{t("msg")}</label>

                        <div className='input'>
                            <textarea
                                name="message"
                                id = {`message${errors.message ? '-error' : ''}`}
                                value={values.message}
                                onChange={(e) => setValues({ ...values, message: e.target.value })}
                            >

                            </textarea>
                            <div style={{ minHeight: "30px" }}>
                                {errors.message && (
                                    <p style={{ color: "red"}}>{errors.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <button className='submit' type="submit" disabled={state.submitting}>
                        {t("sendbtn")}
                    </button>
                    {/* {state.succeeded && (
                        <h1 className='flex' style={{ fontSize: "18px", margin: "0.5rem", textAlign: "center" }}>
                            <Lottie className='lottie' loop={false} style={{ height: 37, paddingRight: "10px" }} animationData={doneAnimation} />
                            {t("confirm")}</h1>
                    )} */}
                    {state.succeeded && <SuccessMessage />}
                </form>
                <div className="animation">
                    <Suspense fallback={
                        <div style={{ minHeight: "400px" }}>{t("loading")}</div>}>
                        <Lottie className=' mail-animation' animationData={mailAnimation} />
                    </Suspense>
                </div>

            </div>

        </section>
    );
}

export default Contact;

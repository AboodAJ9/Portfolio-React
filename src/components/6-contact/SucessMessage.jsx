import Lottie from "lottie-react";
import doneAnimation from "../../animations/done.json";
import { useTranslation } from "react-i18next";


export default function SuccessMessage() {
    const { t } = useTranslation();
    return (
        <div
            className="flex success-msg"
            style={{ fontSize: "18px", margin: "0.5rem", fontWeight: "500" }}
        >
            
            <Lottie
                className="lottie"
                loop={false}
                style={{ height: 37, paddingRight: "10px" }}
                animationData={doneAnimation} />
            {t("confirm")}
        </div>

                            //     <h1 className='flex' style={{ fontSize: "18px", margin: "0.5rem", textAlign: "center" }}>
                            // <Lottie className='lottie' loop={false} style={{ height: 37, paddingRight: "10px" }} animationData={doneAnimation} />
                            // {t("confirm")}</h1>
    );
}
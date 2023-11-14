import {Button, Modal} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import {useEffect, useState} from "react";

interface IPrivacyModal {
    onShow: boolean;
    onClose: () => void;
}

export default function PrivacyModal({onShow, onClose}: IPrivacyModal) {
    const [privacyPolicyText, setPrivacyPolicyText] = useState<string>("");
    const [language, setLanguage] = useState("sv");

    useEffect(() => {
        let filePath = language === "sv" ? '/privacy-policy-sv.txt' : '/privacy-policy-en.txt';

        fetch(filePath)
            .then((response) => response.text())
            .then((text) => setPrivacyPolicyText(text))
            .catch((error) => {
                console.error(`Error fetching Privacy Policy text (${language}):`, error);
            });
    }, [language]);

    return (
        <Modal show={onShow} onHide={onClose} size="lg" fullscreen="md-down">
            <Modal.Header closeButton className="text-mauve">
                <Modal.Title>{language === "sv" ? "Integritetspolicy" : "Privacy Policy"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-end mb-3">
                    <button onClick={() => setLanguage("sv")} className="btn btn-link">
                        <img src="/sweden-flag.svg" alt="Swedish" width="30"/>
                    </button>
                    <button onClick={() => setLanguage("en")} className="btn btn-link">
                        <img src="/great-britain-flag.png" alt="English" width="30"/>
                    </button>
                </div>
                <ReactMarkdown>{privacyPolicyText}</ReactMarkdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} className="btn-dark-purple">
                    {language === "sv" ? "Stäng" : "Close"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import customParseFormat from "dayjs/plugin/customParseFormat";

const dayjs = require('dayjs')
var duration = require("dayjs/plugin/duration");
dayjs.extend(duration);
dayjs.extend(customParseFormat);


function FormText() {
    const [show, setShow] = useState(false);
    function myFunction() {
        // Get the text field
        var copyText = document.getElementById("myInput");

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);

    }
    function fromDateToString(dateV) {
        var stringTmp1 = dayjs(dateV).toString();
        var weekDay = stringTmp1.split(",")[0];
        var number = stringTmp1.split(",")[1].split(" ")[1];
        var month = stringTmp1.split(",")[1].split(" ")[2];
        var day;
        var monthName;
        switch (weekDay) {
            case "Mon":
                day = "Lunedì";
                break;
            case "Tue":
                day = "Martedì";
                break;
            case "Wed":
                day = "Mercoledì";
                break;
            case "Thu":
                day = "Giovedì";
                break;
            case "Fri":
                day = "Venerdì";
                break;
            case "Sat":
                day = "Sabato";
                break;
            case "Sun":
                day = "Domenica";
                break;
            default:
                day = weekDay;
                break;
        }

        switch (month) {
            case "Jan":
                monthName = "Gennaio";
                break;
            case "Feb":
                monthName = "Febbraio";
                break;
            case "Mar":
                monthName = "Marzo";
                break;
            case "Apr":
                monthName = "Aprile";
                break;
            case "May":
                monthName = "Maggio";
                break;
            case "Jun":
                monthName = "Giugno";
                break;
            case "Jul":
                monthName = "Luglio";
                break;
            case "Aug":
                monthName = "Agosto";
                break;
            case "Sep":
                monthName = "Settembre";
                break;
            case "Oct":
                monthName = "Ottobre";
                break;
            case "Nov":
                monthName = "Novembre";
                break;
            case "Dec":
                monthName = "Dicembre";
                break;
            default:
                monthName = month;
                break;
        }

        var returnString = day + " " + number + " " + monthName;
        return returnString;
    }

    function numberPaninetti(numChildren) {
        if (numChildren % 5 === 0)
            return parseInt(numChildren) + 5;
        else
            return Math.floor(parseInt(numChildren) / 5) * 5 + 5;
    }

    function upperNumberRustici(num) {
        if (num % 5 === 0)
            return parseInt(num) + 5;
        else if (num % 5 > 3) 
            return Math.floor(parseInt(num) / 5) * 5 + 10;
        else 
            return Math.floor(parseInt(num) / 5) * 5 + 5;
    }

    function lowerNumberRustici(num) {
        if (num % 5 >= 2) 
            return Math.floor(parseInt(num) / 5) * 5 + 5;
        else
            return Math.floor(parseInt(num) / 5) * 5;
    }

    function teglieFocaccia(num) {
        if (num % 12 === 0)
            return Math.floor(num / 12)
        else if (num % 12 > 8)
            return Math.round(num / 12)
        else if (num % 12 > 6 || num %12 < 8)
            return num/12
        else 
            return Math.floor(num / 12)
        
    }

    function oraRitiroRustici(city, time) {
        const hour = dayjs(time, "HH:mm");
        var timeBarc = dayjs.duration({
            minutes: 30,
            hours: 1
        });
        var timeMil = dayjs.duration({
            minutes: 15,
            hours: 1
        });
        if (city === "Barcellona") {
            return hour.add(timeBarc);
        }
        else {
            return dayjs(time).add(timeMil);
        }
    }

    // State for form values
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [food1, setFood1] = useState('');
    const [food2, setFood2] = useState('');
    const [gender, setGender] = useState('');
    const [numChildren, setNumChildren] = useState(0);
    const [numAdults, setNumAdults] = useState(0);
    const [text, setText] = useState('');
    const [focaccia, setFocaccia] = useState('');
    const [numeroTeglie, setNumeroTeglie] = useState('');

    useEffect(() => {
        // Esempio di calcolo: modifica il calcolo in base alle tue esigenze
        var nuovoValore = teglieFocaccia(numAdults);
        const nVal = Math.round(((nuovoValore)*2))/2;
        setNumeroTeglie(nVal);
    }, [numAdults]);

    const [isLetteraEnabled, setIsLetteraEnabled] = useState(false);

    const handleSwitchChange = (e) => {
        setIsLetteraEnabled(e.target.checked); // true if switch is on, false if off
    };

    const handleClose = () => setShow(false);

    const handleShow = () => {
        var stringDate = fromDateToString(date);
        var nPaninetti = numberPaninetti(numChildren);
        var timeRitiro = oraRitiroRustici(city, time);
        var oraRitiro = timeRitiro.get('hour');
        var minutoRitiro = timeRitiro.get('minute');
        var lowerRusticiAdulti = lowerNumberRustici(numAdults);
        var upperRusticiBambini = upperNumberRustici(numChildren);
        var lowerRusticiBambini = lowerNumberRustici(numChildren);
        var tegliaDecimale = numeroTeglie - Math.floor(numeroTeglie);
        var stringaFocaccia
        var string;
        if(tegliaDecimale !== 0)
            stringaFocaccia = Math.floor(numeroTeglie) + " teglie e mezzo"
        else 
            stringaFocaccia = numeroTeglie + " teglie"
        if (parseInt(numAdults) > 0) {
            string = stringDate + " *" + city + "*" + "\n"
                + "*" + oraRitiro + ":" + minutoRitiro + "* \n\n"
                + "Numero " + age + " " + food1 + "\n"
                + "Lettera " + name.charAt(0).toLocaleUpperCase() + " " + food2 + " \n"
                + nPaninetti + " paninetti\n"
                + lowerRusticiAdulti + " brioches piccole vuote \n\n"
                + "Bambini\n"
                + upperRusticiBambini + " pizzette \n"
                + lowerRusticiBambini + " arancini \n"
                + lowerRusticiBambini + " pitoni prosciutto \n"
                + lowerRusticiBambini + " wurstel \n\n"
                + "Adulti \n"
                + lowerRusticiAdulti + " arancini\n"
                + lowerRusticiAdulti + " pitoni prosciutto\n"
                + lowerRusticiAdulti + " pitoni fritti verdure\n"
                + lowerRusticiAdulti + " san daniele\n"
                + lowerRusticiAdulti + " sfoglie norma\n"
                + lowerRusticiAdulti + " piccantini\n\n"
                + stringaFocaccia+ " \n"
                + focaccia;
        } else {
            string = stringDate + " *" + city + "*" + "\n"
                + "*" + oraRitiro + ":" + minutoRitiro + "* \n\n"
                + "Numero " + age + " " + food1 + "\n"
                + "Lettera " + name.charAt(0) + " " + food2 + " \n"
                + nPaninetti + " paninetti\n\n"
                + "Bambini\n"
                + upperRusticiBambini + " pizzette \n"
                + lowerRusticiBambini + " arancini \n"
                + lowerRusticiBambini + " pitoni prosciutto \n"
                + lowerRusticiBambini + " wurstel \n\n";
        }

        setText(string)
        setShow(true);
    }

    return (
        <>

            <Container>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label>Sede</Form.Label>
                            <Form.Select
                                aria-label="Località"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            >
                                <option value="---">---</option>
                                <option value="Barcellona">Barcellona</option>
                                <option value="Milazzo">Milazzo</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>

                    <Col>
                        <Form.Group className="mb-3" controlId="date">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="hour">
                            <Form.Label>Ora</Form.Label>
                            <Form.Control
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="age">
                            <Form.Label>Età</Form.Label>
                            <Form.Control
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="gender">
                            <Form.Label>Sesso</Form.Label>
                            <Form.Select
                                aria-label="Sesso"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="Bambina">Bambina</option>
                                <option value="Bambino">Bambino</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="food1">
                                <Form.Label>Vuoto Palline/Liscio per numero</Form.Label>
                                <Form.Select
                                    aria-label="Vuoto palline/liscio"
                                    value={food1}
                                    onChange={(e) => setFood1(e.target.value)}
                                >
                                    <option value="---">---</option>
                                    <option value="vuoto palline">Vuoto Palline</option>
                                    <option value="vuoto liscio">Vuoto Liscio</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Check
                                type="switch"
                                id="lettera"
                                label="Lettera Si/No"
                                checked={isLetteraEnabled}
                                onChange={handleSwitchChange}
                            />
                            {isLetteraEnabled &&
                                <Form.Group className="mb-3" controlId="food2">
                                    <Form.Label>Vuoto Palline/Liscio per lettera</Form.Label>
                                    <Form.Select
                                        aria-label="Vuoto palline/liscio"
                                        value={food2}
                                        onChange={(e) => setFood2(e.target.value)}
                                    >
                                        <option value="---">---</option>
                                        <option value="vuoto palline">Vuoto Palline</option>
                                        <option value="vuoto liscio">Vuoto Liscio</option>
                                    </Form.Select>
                                </Form.Group>}
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3 auto" controlId="numChildren">
                                        <Form.Label>Numero bambini</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={numChildren}
                                            onChange={(e) => setNumChildren(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3 auto" controlId="numAdults">
                                        <Form.Label>Numero adulti</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={numAdults}
                                            onChange={(e) => setNumAdults(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <Form.Group className="mb-3" controlId="focaccia">
                                <Form.Label>Gusti focaccia</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={focaccia}
                                    onChange={(e) => setFocaccia(e.target.value)}
                                />
                            </Form.Group>
                                </Col>
                            <Col>
                                <Form.Group className="mb-3 auto" controlId="numAdults">
                                        <Form.Label>Numero teglie</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={numeroTeglie}
                                            onChange={(e) => setNumeroTeglie(e.target.value)}
                                            step={0.5}
                                        />
                                </Form.Group>
                            </Col>
                            
                            </Row>
                            
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Button variant="primary" onClick={handleShow}>
                        Genera messaggio
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Messaggio da copiare</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <textarea
                                value={text}
                                id="myInput"
                                onChange={(e) => setText(e.target.value)}
                                rows={6} // Numero di righe visibili
                                style={{ width: '100%' }} // Larghezza 100%
                            />
                            <Button onClick={myFunction}>Copia messaggio</Button>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
            </Container>
        </>
    );
}

export default FormText;

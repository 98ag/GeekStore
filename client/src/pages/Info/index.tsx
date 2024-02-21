import { Link } from "react-router-dom";
import { IconMongodb, IconExpress, IconReact, IconNodeJs, IconLinkedin, IconGithub } from "./Components/Icons.tsx";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import "./Styles/info.css"

export default function Info() {
    return (
        <div className="info">
            <div className="info__container">
                <Link to="/">
                    <div className="info__logocontainer">
                        <img src="images/Logo.svg" alt="Logo" className="info__logo"/>
                    </div>
                </Link>

                <span className="info__title" >desarrollado con</span>

                <div className="info__iconcontainer">
                    <div className="info__icondiv">
                        <IconMongodb className="info__iconimg"/>
                        <span className="info__icontext">mongoDB</span>
                    </div>

                    <div className="info__icondiv">
                        <IconExpress className="info__iconimg"/>
                        <span className="info__icontext">Express.js</span>
                    </div>

                    <div className="info__icondiv">
                        <IconReact className="info__iconimg"/>
                        <span className="info__icontext">React</span>
                    </div>

                    <div className="info__icondiv">
                        <IconNodeJs className="info__iconimg"/>
                        <span className="info__icontext">Node.js</span>
                    </div>
                </div>

                <div className="info__information">
                    <div className="info__socials">
                        <IconLinkedin link="https://www.linkedin.com/in/agarciamag/"/>
                        <IconGithub link="https://github.com/98ag"/>
                        <span>Agustin Garcia Maggioni [2023]</span>
                    </div>

                    <div>
                        <a href="https://github.com/98ag/GeekStore" className="info__code">
                            <span>Ver codigo fuente</span><OpenInNewIcon sx={{ fontSize: 18 }}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
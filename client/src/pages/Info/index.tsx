import { Link } from "react-router-dom";
import { IconMongodb, IconExpress, IconReact, IconNodeJs, IconLinkedin, IconGithub } from "./Componentes/Icons.tsx";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import "./info.css"

export default function Info() {
    return (
        <div className="info">
            <div className="info__container">
                <Link to="/">
                    <div className="info__logo--container">
                        <img src="images/Logo.svg" alt="Logo" className="info__logo"/>
                    </div>

                </Link>

                <span className="info__titulo" >desarrollado con</span>

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

                <div className="info__datos">
                    <div className="info__datos--personales">
                        <IconLinkedin className="info__datos--icono" link="https://www.linkedin.com/in/agarciamag/"/>
                        <IconGithub className="info__datos--icono" link="https://github.com/98ag"/>
                        <span className="info__datos--texto">Agustin Garcia Maggioni [2023]</span>
                    </div>

                    <div>
                        <a href="#" className="info__datos--codigo">
                            <span>Ver codigo fuente</span><OpenInNewIcon sx={{ fontSize: 18 }}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
import React from 'react';
import './Footer.css';
import { Container, Row, Col } from 'react-bootstrap';
const Footer = () => {
	return (
		<>
			<div className="footer_top">
				<Container>
					<Row lg={4} md={4} sm={2} xs={2}>
						<Col>
							<div>
								<h2 className="footer_heading">Overview</h2>
								<ul className="footer_heading-list">
									<li className="footer_heading-li">
										<a href="##" className="footer_heading-link">
											About us
										</a>
									</li>
									<li className="footer_heading-li">
										<a href="##" className="footer_heading-link">
											FAQS
										</a>
									</li>
									<li className="footer_heading-li">
										<a href="##" className="footer_heading-link">
											Privacy Policy
										</a>
									</li>
									<li className="footer_heading-li">
										<a href="##" className="footer_heading-link">
											Terms & Conditions
										</a>
									</li>
									<li className="footer_heading-li">
										<a href="##" className="footer_heading-link">
											Why travelers choose TCAR
										</a>
									</li>
								</ul>
							</div>
						</Col>
						<Col>
							<div>
								<h2 className="footer_heading">Company</h2>
								<ul className="footer_heading-list">
									<li className="footer_heading-li">
										<a href="##" className="footer_heading-link">
											Discover
										</a>
									</li>
									<li className="footer_heading-li">
										<a href="##" className="footer_heading-link">
											Sustainability
										</a>
									</li>
									<li className="footer_heading-li">
										<a href="##" className="footer_heading-link">
											Car booking instructions
										</a>
									</li>
									<li className="footer_heading-li">
										<a href="##" className="footer_heading-link">
											Guide for car owners
										</a>
									</li>
									<li className="footer_heading-li">
										<a href="##" className="footer_heading-link">
											Payment Guide
										</a>
									</li>
								</ul>
							</div>
						</Col>
						<Col>
							<div>
								<h2 className="footer_heading">Connect with us</h2>
								<ul className="footer_heading-list">
									<li className="footer_heading-li">
										<a href="##" className="footer_heading-link">
											1800 391 3230 (Toll-Free)
										</a>
									</li>
									<li className="footer_heading-li">
										<a href="##" className="footer_heading-link">
											EdenHazard@tcar.com
										</a>
									</li>
									<li className="footer_heading-li">
										<a href="##" className="footer_heading-link">
											Press
										</a>
									</li>
									<li className="footer_heading-li">
										<a href="##" className="footer_heading-link">
											Feedback
										</a>
									</li>
								</ul>
							</div>
						</Col>
						<Col>
							<div>
								<h2 className="footer_heading">Download app</h2>
								<ul className="footer_heading-list">
									<li className="footer_heading-li">
										<div className="footer_download">
											<img
												src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/d91264e165ed6facc6178994d5afae79.png"
												alt="QR_code"
												width="80"
												height="80"
											/>
											<div className="footer_download--img">
												<img
													src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/39f189e19764dab688d3850742f13718.png"
													alt="App_store"
													width="80"
													height="20"
												/>
												<img
													src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/f4f5426ce757aea491dce94201560583.png"
													alt="GG_play"
													width="80"
													height="18"
													className="footer_download-gg"
												/>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<div className="footer_bottom">
				<Container>
					<Row lg={1} md={1} sm={1} xs={1}>
						<Col>
							<div className="footer_bottom-layout">
								<h3 className="footer_bottom-text">
									© 2021 - Copyright by Tourist car rental Company - TCAR.vn
								</h3>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
};

export default Footer;

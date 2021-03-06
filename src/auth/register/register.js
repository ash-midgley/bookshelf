import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { Formik } from "formik";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import {
  validateEmail,
  validatePasswordLength,
} from "../../shared/field-validator";
import { register } from "../../shared/auth.service";

const Register = ({ history }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();

  const submitEntry = (values) => {
    setError(null);
    setSubmitting(true);

    var user = {
      email: values.email,
      password: values.password,
    };

    register(user)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleSuccess = (userId) => {
    setSubmitting(false);
    history.push(`/shelf/${userId}`);
  };

  const handleError = (error) => {
    setError(error);
    setSubmitting(false);
  };

  return (
    <section className="section hero is-fullheight mobile-auth">
      <Helmet>
        <title>Register - Bookshelf</title>
        <meta
          name="description"
          content="Join the Bookshelf community for free! Add books to your shelf. Rate them. Put them into categories. Share with friends."
        />
      </Helmet>
      <div className="hero-body mobile-auth">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-two-fifths">
              <div className="card header-background">
                <header className="card-header">
                  <p className="card-header-title">
                    <span className="icon">
                      <FontAwesomeIcon icon={faLock} size="sm" />
                    </span>
                    <span>Register</span>
                  </p>
                </header>
                <div className="card-content">
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validate={(values) => {
                      let errors = {};
                      if (!validateEmail(values.email))
                        errors.email = "Incorrect email format";
                      if (!values.email) errors.email = "Required";
                      if (!validatePasswordLength(values.password))
                        errors.password =
                          "Password must be at least 5 characters long";
                      if (!values.password) errors.password = "Required";
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      submitEntry(values);
                      setSubmitting(false);
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <form className="form" onSubmit={handleSubmit}>
                        <div className="field">
                          <label className="label custom-label">Email</label>
                          <div className="control is-clearfix">
                            <input
                              autoFocus="autofocus"
                              className={
                                errors.email && touched.email
                                  ? "input is-danger"
                                  : "input"
                              }
                              type="text"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                          </div>
                          {errors.email && touched.email && (
                            <div className="has-text-danger is-size-7 custom-validation">
                              {errors.email}
                            </div>
                          )}
                        </div>
                        <div id="password-field" className="field">
                          <label className="label custom-label">Password</label>
                          <div className="control is-clearfix">
                            <input
                              className={
                                errors.password && touched.password
                                  ? "input is-danger"
                                  : "input"
                              }
                              type="password"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                          </div>
                          {errors.password && touched.password && (
                            <div className="has-text-danger is-size-7 custom-validation">
                              {errors.password}
                            </div>
                          )}
                        </div>
                        {error && (
                          <div className="notification is-danger custom-notification">
                            {error}
                          </div>
                        )}
                        <hr />
                        <div className="field is-grouped">
                          <div className="control">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className={
                                submitting
                                  ? "button is-dark is-loading"
                                  : "button is-dark"
                              }
                            >
                              Register
                            </button>
                          </div>
                          <div className="control">
                            <Link to="/" className="button is-outlined">
                              Cancel
                            </Link>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default withRouter(Register);

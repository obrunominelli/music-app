import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const user = await getUser();
      this.setState({
        user,
        loading: false,
      });
    });
  }

  render() {
    const { user: { name, email, description, image }, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile" className="flex-container">
          {loading
            ? <Loading />
            : (
              <section className="profile">
                <div className="row">
                  <img
                    src={ image }
                    data-testid="profile-image"
                    alt={ `Imagem de ${name}` }
                    className="profile-image"
                  />
                  <Link
                    to="/profile/edit"
                    className="block button button-blue"
                  >
                    Editar perfil
                  </Link>
                </div>
                <div className="profile-block">
                  <strong className="content-title-auto">Nome</strong>
                  <p className="content-text-auto">{name}</p>
                </div>
                <div className="profile-block">
                  <strong className="content-title-auto">Email</strong>
                  <p className="content-text-auto">{email}</p>
                </div>
                <div className="profile-block">
                  <strong className="content-title-auto">Descrição</strong>
                  <p className="content-text-auto">{description}</p>
                </div>
              </section>
            )}
        </div>
      </>
    );
  }
}

export default Profile;

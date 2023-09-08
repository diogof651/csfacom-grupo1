import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { BsSearch, BsPuzzle } from 'react-icons/bs'; 
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge'; // Importe o componente Badge

export function Formproj(props) {
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [searchText, setSearchText] = useState("");
  const [cards, setCards] = useState(generateFixedCards());

  function generateFixedCards() {
    return [
      { type: 'Projeto de extensão', state: 'Em andamento', text: 'Desenvolva soluções inovadoras para tornar as cidades mais verdes e eficientes em termos de recursos.', startDate: '01/01/2023', endDate: '31/12/2023' },
      { type: 'TCC', state: 'Concluído', text: 'Crie uma plataforma de ensino à distância que revoluciona a maneira como as pessoas aprendem.', startDate: '15/02/2022', endDate: '30/11/2022' },
      { type: 'Mestrado', state: 'Em andamento', text: 'Desenvolva um aplicativo que monitora a saúde e o bem-estar dos usuários, incentivando um estilo de vida ativo.', startDate: '10/05/2023', endDate: '05/12/2023' },
      { type: 'Doutorado', state: 'Descontinuado', text: ' Implemente sistemas de energia solar e eólica em comunidades remotas, promovendo a independência energética.', startDate: '20/03/2021', endDate: '10/09/2021' },
      // Adicione mais cartões conforme necessário
    ];
  }

  const handleOptionChange1 = (e) => {
    setSelectedOption1(e.target.value);
  };

  const handleOptionChange2 = (e) => {
    setSelectedOption2(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleApplyFilter = () => {
    // Aplicar os filtros selecionados e atualizar a lista de cartões
    const filteredCards = generateFixedCards().filter((card) => {
      if (selectedOption1 && card.type !== selectedOption1) return false;
      if (selectedOption2 && card.state !== selectedOption2) return false;
      if (
        searchText &&
        !card.type.toLowerCase().includes(searchText.toLowerCase()) &&
        !card.state.toLowerCase().includes(searchText.toLowerCase()) &&
        !card.text.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    // Atualizar a lista de cartões filtrados
    setCards(filteredCards);
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center" style={{ width: '100%', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
        <h1 style={{ fontFamily: 'Inter', fontWeight: 'bold', marginRight: '10px' }}>Projetos</h1>
        <button
          type="button"
          className="btn inter-bold"
          style={{ backgroundColor: 'white', color: '#2788B7', border: '1px solid #2788B7' }}
        >
          Novo Projeto
        </button>
      </div>
      <Form className="mt-4">
        <div className="d-flex align-items-center">
          <div className="position-relative me-2">
            <BsSearch
              className="position-absolute top-50 start-0 translate-middle-y"
              style={{ fontSize: '1.2em', height: '1em', width: '2em', left: '5px' }}
            />
            <Form.Control
              type="text"
              style={{ width: '800px', paddingLeft: '35px' }}
              onChange={handleSearchChange}
              value={searchText}
            />
          </div>
          <Form.Select
            value={selectedOption1}
            onChange={handleOptionChange1}
            style={{ width: '150px', marginRight: '10px' }}
          >
            <option value="">Tipo</option>
            <option value="Projeto de extensão">Projeto de extensão</option>
            <option value="TCC">TCC</option>
            <option value="Mestrado">Mestrado</option>
            <option value="Doutorado">Doutorado</option>
            <option value="IC">IC</option>
            <option value="Atividade Orientada de Ensino">Atividade Orientada de Ensino</option>
            <option value="Estágio">Estágio</option>
            <option value="Outros">Outros</option>
          </Form.Select>
          <Form.Select
            value={selectedOption2}
            onChange={handleOptionChange2}
            style={{ width: '150px', marginRight: '40px' }}
          >
            <option value="">Estado</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
            <option value="Descontinuado">Descontinuado</option>
          </Form.Select>
          <button
            type="button"
            className="btn btn-primary inter-bold"
            style={{ backgroundColor: 'var(--blue)' }}
            onClick={handleApplyFilter}
          >
            Aplicar
          </button>
        </div>
      </Form>

      <div className="d-flex flex-wrap mt-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            style={{ width: '18rem', margin: '8px' }}
          >
            <BsPuzzle style={{ fontSize: '1.5em', marginLeft: '8px', marginTop: '8px' }} /> {/* Aumente o tamanho do ícone */}
            <Card.Body>
              <Card.Title>{card.type}</Card.Title>
              <Card.Text>{card.text}</Card.Text>
              <p style={{ fontSize: '14px', marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  {card.state === 'Em andamento' && <Badge bg="primary">Em andamento</Badge>}
                  {card.state === 'Concluído' && <Badge bg="success">Concluído</Badge>}
                  {card.state === 'Descontinuado' && <Badge bg="danger">Descontinuado</Badge>}
                </span>
                <span style={{ fontSize: '10px' }}>
                  {` ${card.startDate} - ${card.endDate}`}
                </span>
              </p> {/* Exiba as badges e datas com base no estado */}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

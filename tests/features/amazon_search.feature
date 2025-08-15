Feature: Pesquisa simples no site da Amazon

  Scenario: Pesquisar um produto
    Given que estou na página inicial da Amazon
    When eu pesquiso por "notebook"
    Then devo ver resultados relacionados a "notebook"
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(data => {
        const dadosDiv = document.getElementById('dados');
        dadosDiv.innerHTML = `<p>${data.message}</p><ul>${data.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
      })
      .catch(error => {
        console.error('Erro na requisição AJAX:', error);
      });
  });
  
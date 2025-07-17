document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault(); 
  
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
  
      console.log('📨 Datos del formulario:');
      console.log('Nombre:', name);
      console.log('Email:', email);
      console.log('Mensaje:', message);
  
      form.reset();
    });
  });
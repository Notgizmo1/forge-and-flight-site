// worker/index.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle contact form submissions
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      return handleContactForm(request, env);
    }
    
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    // Serve static assets
    return env.ASSETS.fetch(request);
  }
};

async function handleContactForm(request, env) {
  try {
    const formData = await request.formData();
    
    // Honeypot spam prevention - if this hidden field is filled, it's a bot
    if (formData.get('website')) {
      // Return success to the bot but don't actually send email
      return new Response(JSON.stringify({ success: true }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Extract and validate form fields
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const company = formData.get('company')?.trim();
    const phone = formData.get('phone')?.trim();
    const message = formData.get('message')?.trim();
    
    // Validate required fields
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Please complete all required fields' 
      }), { 
        status: 400, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Please enter a valid email address' 
      }), { 
        status: 400, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Send email via Resend API
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Contact Form <noreply@forgeandflight.com>',
        to: env.CONTACT_EMAIL,
        reply_to: email,
        subject: `New Inquiry from ${name}${company ? ' at ' + company : ''}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0A1628; border-bottom: 2px solid #003366; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="background: #F8F9FA; padding: 20px; margin: 20px 0; border-radius: 5px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            </div>
            <div style="margin: 20px 0;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #A8A9AD; margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              Sent from forgeandflight.com contact form
            </p>
          </div>
        `
      })
    });
    
    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error('Email API error:', errorData);
      
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'An error occurred sending your message. Please try again or email us directly.' 
      }), { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Success response
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Thank you for your inquiry. We will respond within one business day.' 
    }), { 
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'An unexpected error occurred. Please try again.' 
    }), { 
      status: 500, 
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
if (request.method === 'POST' && url.pathname === '/api/contact') {
  const formData = await request.json();
  
  // Send email via Resend API (as shown in your structure)
  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'website@forgeandflight.com',
      to: 'info@forgeandflight.com',
      subject: `Contact Form: ${formData.inquiryType}`,
      html: `
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Organization:</strong> ${formData.organization}</p>
        <p><strong>Inquiry Type:</strong> ${formData.inquiryType}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `
    })
  });
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
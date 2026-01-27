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
    // Parse JSON body
    const data = await request.json();
    
    // Extract fields
    const name = data.name?.trim();
    const email = data.email?.trim();
    const organization = data.organization?.trim();
    const inquiryType = data.inquiryType?.trim();
    const message = data.message?.trim();
    
    // Validate required fields
    if (!name || !email || !message || !inquiryType) {
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
    
    // Format inquiry type for display
    const inquiryTypeLabels = {
      'platform': 'UAS Platform Inquiry',
      'partnership': 'Partnership / Investment',
      'general': 'General Information',
      'media': 'Media / Press',
      'other': 'Other'
    };
    const inquiryTypeDisplay = inquiryTypeLabels[inquiryType] || inquiryType;
    
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
        subject: `${inquiryTypeDisplay}: ${name}${organization ? ' - ' + organization : ''}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0A1628; border-bottom: 2px solid #003366; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="background: #F8F9FA; padding: 20px; margin: 20px 0; border-radius: 5px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ''}
              <p><strong>Inquiry Type:</strong> ${inquiryTypeDisplay}</p>
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

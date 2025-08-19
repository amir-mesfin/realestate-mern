import { MailerSend } from 'mailersend';

export const sendToEmail = async (req, res, next) => {
  const { name, email, phone, message, to, property, address } = req.body;
  
  try {
    const mailersend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });

    // Use MailerSend's test domain as the sender
    const testDomainSender = 'no-reply@test-nrw7gymd6m2g2k8e.mlsender.net';
    const owner ='abushe339@gmail.com';
    const response = await mailersend.email.send({
      from: {
        email: testDomainSender, 
        name:'Abushe-Real-State'
      },
      to: [{
        email:owner // Make sure this email is whitelisted in MailerSend
      }],
      reply_to: { // Add user's real email as reply-to
        email: email,
        name: name
      },
      subject: `New inquiry about ${property}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n\nProperty: ${property}\nAddress: ${address}
       \n send to : ${to}`,

    });

    res.json({ success: true, message: "Message sent successfully", response });
  } catch (err) {
    
    console.error('MailerSend Error:', err.response?.body || err.message);
    res.status(500).json({ 
      success: false, 
      message: "Error sending email",
      error: err.message,
      details: err.response?.body || null
     
    });
    console.log(err.message);
  }
};
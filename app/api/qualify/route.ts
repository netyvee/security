import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      premises,
      service,
      hours,
      postcode,
      preferredStart,
      contractLength,
      serviceType,
      name,
      company,
      email,
    } = body

    // Send to CRM
    const crmEndpoint = process.env.NEXT_PUBLIC_CRM_ENDPOINT || 'https://app.vigilservices.co.uk/enquiry'

    try {
      await fetch(crmEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          service_type: 'Security',
          premises_type: premises,
          service_required: service,
          hours_required: hours,
          postcode,
          preferred_start: preferredStart,
          contract_length: contractLength,
          name,
          company,
          email,
          source: 'Security Website Qualification Flow',
          created_at: new Date().toISOString(),
        }),
      })
    } catch (crmError) {
      console.error('CRM submission error:', crmError)
      // Don't fail the request if CRM is down
    }

    // Send emails via Resend
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
    } else {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)

        // Email 1 - Team notification
        await resend.emails.send({
          from: 'Vigil Security Services <security@vigilservices.co.uk>',
          to: 'security@vigilservices.co.uk',
          subject: `New security enquiry — ${premises} — ${postcode}`,
          html: `
            <h2>New Security Enquiry</h2>
            <p><strong>Name:</strong> ${name || 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Premises Type:</strong> ${premises}</p>
            <p><strong>Service Required:</strong> ${service}</p>
            <p><strong>Hours:</strong> ${hours}</p>
            <p><strong>Location:</strong> ${postcode}</p>
            <p><strong>Preferred Start:</strong> ${preferredStart || 'Not specified'}</p>
            <p><strong>Contract Length:</strong> ${contractLength || 'Not specified'}</p>
            <p><strong>Source:</strong> Security Website Qualification Flow</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-GB')}</p>
          `,
        })

        // Email 2 - Client acknowledgement (only if email provided)
        if (email) {
          await resend.emails.send({
            from: 'Vigil Security Services <security@vigilservices.co.uk>',
            to: email,
            subject: 'Your enquiry is confirmed — Vigil Security Services',
            html: `
              <p>Dear ${name || 'valued customer'},</p>
              <p>Thank you for your enquiry with Vigil Security Services.</p>
              <p>We have received your brief and will review your requirements. A member of our team will be in touch within 24 hours.</p>
              <p><strong>Brief summary:</strong></p>
              <ul>
                <li>Service: ${service}</li>
                <li>Location: ${postcode}</li>
                <li>Hours: ${hours}</li>
              </ul>
              <p>For urgent matters, please call 020 3098 6037 or reply to this email.</p>
              <p>The Vigil Security team</p>
            `,
          })
        }
      } catch (emailError) {
        console.error('Email notification error:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Qualification submission error:', error)
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 })
  }
}

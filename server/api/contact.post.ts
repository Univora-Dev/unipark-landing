export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name, phone, message } = body

    if (!name || !phone) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Name and phone are required',
        })
    }

    const config = useRuntimeConfig()
    const token = config.telegramBotToken
    const targetChatIds = (config.telegramChatId || '').split(',').map((id: string) => id.trim()).filter(Boolean)

    // Sanitize inputs for HTML
    const sanitize = (text: string) => text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")

    const safeName = sanitize(name)
    const safePhone = sanitize(phone)
    const safeMessage = message ? sanitize(message) : 'Yo\'q'

    const text = `
📩 <b>Murojaat</b>

👤 <b>Ism:</b> ${safeName}
📞 <b>Telefon:</b> ${safePhone}
📝 <b>Xabar:</b> ${safeMessage}
  `

    try {
        const promises = targetChatIds.map(chatId =>
            $fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                body: {
                    chat_id: chatId,
                    text: text,
                    parse_mode: 'HTML',
                },
            }).catch(e => {
                console.error(`Telegram send failed for ${chatId}:`, e)
                return { ok: false, error: e, chatId }
            })
        )

        const results = await Promise.all(promises)

        console.log('Form submission processed for:', targetChatIds)

        return { success: true, results }
    } catch (error: any) {
        console.error('API Error:', error)
        return { success: false, error: error.message }
    }
})

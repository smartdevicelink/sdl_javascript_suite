// ------ Not part of the RPC spec itself -----

/**
 * Set the Template
 * @deprecated Use setTemplateParam instead
 * @param {String} template - Predefined or dynamically created window template. Currently only predefined window template layouts are defined. - The desired Template.
 * {'string_min_length': 1, 'string_max_length': 500}
 * @returns {TemplateConfiguration} - The class instance for method chaining.
 */
setTemplate (template) {
    this.setParameter(TemplateConfiguration.KEY_TEMPLATE, template);
    return this;
}

/**
 * Get the Template
 * @deprecated Use getTemplateParam instead
 * @returns {String} - the KEY_TEMPLATE value
 */
getTemplate () {
    return this.getParameter(TemplateConfiguration.KEY_TEMPLATE);
}

// ----------------- END -----------------------
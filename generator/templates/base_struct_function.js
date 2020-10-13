{% extends 'base_template.js' %}

{% block typedef %}
{%- if description is defined or deprecated is defined %}
/**
 {% if description is defined -%}
 {% for d in description -%}
 * {{d}}
 {% endfor -%}
 {% else -%}
 * Struct description not available.
 {% endif -%}
 {% if deprecated is defined -%}
 * @deprecated
 {% endif -%}
 */
{%- endif %}
{%- endblock %}
{% block body %}
    /**
     * Initalizes an instance of {{name}}.
     * @class
     * @param {object} parameters - An object map of parameters.
     {%- if since is defined and since is not none %}
     {% if deprecated is defined and deprecated is not none -%}
     * @since SmartDeviceLink {{history[0].since}}
     * @deprecated in SmartDeviceLink {{since}}
     {%- elif history is defined and history is not none %}
     * @since SmartDeviceLink {{history[0].since}}
     {%- else -%}
     * @since SmartDeviceLink {{since}}
     {%- endif -%}
     {%- endif %}
     */
{%- block constructor %}
{% endblock -%}
    {%- if script is defined %}
{{script|indent(4,True)}}
{% endif -%}
    {% for method in methods %}
    {% set len = method.type|length + method.param_name|length + 13 -%}
    /**
     * Set the {{method.method_title}}
     {%- if method.since is defined and method.since is not none %}
     {% if method.deprecated is defined and method.deprecated is not none -%}
     * @since SmartDeviceLink {{method.history[0].since}}
     * @deprecated in SmartDeviceLink {{method.since}}
     {%- elif method.history is defined and method.history is not none %}
     * @since SmartDeviceLink {{method.history[0].since}}
     {%- else -%}
     * @since SmartDeviceLink {{method.since}}
     {%- endif -%}
     {%- endif %}
     {% if not method.description -%}
     * @param {{'%s%s%s %s'|format('{', method.type, '}', method.param_name)}} - The desired {{method.method_title}}.
     {% else -%}
     * {% for d in method.description -%}
     {% if loop.index == 1 -%}
     @param {{'%s%s%s %s - %s'|format('{', method.type, '}', method.param_name, d)}} - The desired {{method.method_title}}.
     {% else -%}
     * {{d}}
     {% endif -%} {% endfor -%}
     {% endif -%}
     {% if method.param_values is defined and method.param_values -%}
     * {{method.param_values}}
     {% endif -%}
     * @returns {{'%s%s%s'|format('{', name, '}')}} - The class instance for method chaining.
     */
    set{{method.method_title}} ({{method.param_name}}) {
        {%- if method.external %}
        this._validateType({{method.external}}, {{method.param_name}}{{ ', true' if '[]' in method.type }});
        {%- endif %}
        this.setParameter({{name}}.{{method.key}}, {{method.param_name}});
        return this;
    }

    /**
     * Get the {{method.method_title}}
     {% if deprecated is defined -%}
     * @deprecated
     {% endif -%}
     * @returns {{'%s%s%s'|format('{', method.type, '}')}} - the {{method.key}} value
     */
    get{{method.method_title}} () {
        {%- if method.external %}
        return this.getObject({{method.external}}, {{name}}.{{method.key}});
        {%- else %}
        return this.getParameter({{name}}.{{method.key}});
        {%- endif %}
    }
{% endfor -%}
{%- endblock %}
{% block properties -%}
{% for param in params %}
{{name}}.{{param.key}} = {{param.value}};
{%- endfor %}
{%- endblock %}
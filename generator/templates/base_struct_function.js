{% extends 'base_template.js' %}

{% block typedef %}
{%- if description is defined or deprecated is defined %}
/**
 {% if description is defined -%}
 {% for d in description -%}
 * {{d}}
 {% endfor -%}
 {% endif -%}
 {% if deprecated is defined -%}
 * @deprecated
 {% endif -%}
 */
{%- endif %}
{%- endblock %}
{% block body %}
    /**
     {% if deprecated is defined -%}
     * @deprecated
     {% endif -%}
     * @constructor
     */
{%- block constructor %}
{% endblock -%}
    {% if scripts is defined -%}
    {% for s in scripts %}
{{s|indent(4,True)}}
    {% endfor -%}
    {% endif -%}
    {% for e in methods %}
    {% set l = e.type|length + e.param_name|length + 13 -%}
    /**
     {% if deprecated is defined -%}
     * @deprecated
     {% endif -%}
     {% if not e.description -%}
     * @param {{'%s%s%s %s'|format('{', e.type, '}', e.param_name)}}
     {% else -%}
     * {% for d in e.description -%}
     {% if loop.index == 1 -%}
     @param {{'%s%s%s %s - %s'|format('{', e.type, '}', e.param_name, d)}}
     {% else -%}
     * {{d|indent(l,True)}}
     {% endif -%} {% endfor -%}
     {% endif -%}
     * @return {{'%s%s%s'|format('{', name, '}')}}
     */
    set{{e.method_title}} ({{e.param_name}}) {
        {%- if e.external and 'Array' not in e.type %}
        this.validateType({{e.external}}, {{e.param_name}});
        {%- endif %}
        this.setParameter({{name}}.{{e.key}}, {{e.param_name}});
        return this;
    }

    /**
     {% if deprecated is defined -%}
     * @deprecated
     {% endif -%}
     * @return {{'%s%s%s'|format('{', e.type, '}')}}
     */
    get{{e.method_title}} () {
        {%- if e.external %}
        return this.getObject({{e.external}}, {{name}}.{{e.key}});
        {%- else %}
        return this.getParameter({{name}}.{{e.key}});
        {%- endif %}
    }
{% endfor %}
{%- endblock %}
{% block properties %}
{%- for e in params %}
{{name}}.{{e.key}} = {{e.value}};
{%- endfor %}
{%- endblock %}
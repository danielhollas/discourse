import selectKit from "helpers/select-kit-helper";
import componentTest from "helpers/component-test";
moduleForComponent("value-list", { integration: true });

componentTest("adding a value", {
  template: "{{value-list values=values}}",

  skip: true,
  async test(assert) {
    this.set("values", "vinkas\nosama");

    await selectKit().expand();
    await selectKit().fillInFilter("eviltrout");
    await selectKit().keyboard("enter");

    assert.ok(
      find(".values .value").length === 3,
      "it adds the value to the list of values"
    );

    assert.deepEqual(
      this.values,
      "vinkas\nosama\neviltrout",
      "it adds the value to the list of values"
    );
  }
});

componentTest("removing a value", {
  template: "{{value-list values=values}}",

  async test(assert) {
    this.set("values", "vinkas\nosama");

    await click(".values .value[data-index='0'] .remove-value-btn");

    assert.ok(
      find(".values .value").length === 1,
      "it removes the value from the list of values"
    );

    assert.equal(this.values, "osama", "it removes the expected value");
  }
});

componentTest("selecting a value", {
  template: "{{value-list values=values choices=choices}}",

  async test(assert) {
    this.set("values", "vinkas\nosama");
    this.set("choices", ["maja", "michael"]);

    await selectKit().expand();
    await selectKit().selectRowByValue("maja");

    assert.ok(
      find(".values .value").length === 3,
      "it adds the value to the list of values"
    );

    assert.deepEqual(
      this.values,
      "vinkas\nosama\nmaja",
      "it adds the value to the list of values"
    );
  }
});

componentTest("array support", {
  template: "{{value-list values=values inputType='array'}}",

  async test(assert) {
    this.set("values", ["vinkas", "osama"]);

    await selectKit().expand();
    await selectKit().fillInFilter("eviltrout");
    await selectKit().keyboard("enter");

    assert.ok(
      find(".values .value").length === 3,
      "it adds the value to the list of values"
    );

    assert.deepEqual(
      this.values,
      ["vinkas", "osama", "eviltrout"],
      "it adds the value to the list of values"
    );
  }
});

componentTest("delimiter support", {
  template: "{{value-list values=values inputDelimiter='|'}}",

  skip: true,
  async test(assert) {
    this.set("values", "vinkas|osama");

    await selectKit().expand();
    await selectKit().fillInFilter("eviltrout");
    await selectKit().keyboard("enter");

    assert.ok(
      find(".values .value").length === 3,
      "it adds the value to the list of values"
    );

    assert.deepEqual(
      this.values,
      "vinkas|osama|eviltrout",
      "it adds the value to the list of values"
    );
  }
});
